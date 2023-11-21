import gDriveService from './gdrive'; // Your Google Drive service file

declare global {
    interface WatchListData {
        toWatch: string[]; // Array of IMDb IDs in to-watch list
        watched: string[]; // Array of IMDb IDs in watched list
        driveMapping: { [key: string]: string }; // Index signature for driveMapping
    }
}

// let gDriveService: any;
// window.onload = () => { gDriveService = new GDriveService() };

class WatchListService {
    private watchListData: WatchListData = {
        toWatch: [],
        watched: [],
        driveMapping: {}
    };

    constructor() {
        console.log('watchlist service constructor');
        this.watchListData = this.loadWatchListData();
    }

    public async postAuth() {
        if (!gDriveService) return;
        if (!gDriveService.isLoggedIn) return;
        this.syncDriveFiles();
    }

    private loadWatchListData(): WatchListData {
        const savedData = localStorage.getItem('watchListData');
        return savedData ? JSON.parse(savedData) : { toWatch: [], watched: [], driveMapping: {} };
    }

    private save() {
        localStorage.setItem('watchListData', JSON.stringify(this.watchListData));
    }

    private setDriveFileId(imdbID: string, driveId: string) {
        this.watchListData.driveMapping[imdbID] = driveId;
        this.save();
    }

    private unsetDriveFileId(imdbID: string) {
        delete this.watchListData.driveMapping[imdbID];
        this.save();
    }

    private getDriveFileId(imdbID: string) {
        return this.watchListData.driveMapping[imdbID];
    }

    private _addToWatchList(id: string) {
        if (this.watchListData.watched.includes(id))
            this.removeWatchedList(id);
        if (!this.watchListData.toWatch.includes(id)) {
            this.watchListData.toWatch.push(id);
            this.save();
        }
    }

    private _addWatchedList(id: string) {
        if (this.watchListData.toWatch.includes(id))
            this.removeToWatchList(id);
        if (!this.watchListData.watched.includes(id)) {
            this.watchListData.watched.push(id);
            this.save();
        }
    }

    public async syncDriveFiles() {
        // current behaviour delete local, drive -> local
        // TODO conflict resolution by latest timestamp

        let newToWatchList: string[] = [];
        let newWatchedList: string[] = [];
        let newDriveMapping: { [key: string]: string } = {};

        const driveFiles = await gDriveService.listFilesDir();
        if (!driveFiles) return;
        driveFiles.forEach((item: any) => {
            const { id, name } = item;
            const startIndex = name.indexOf('_') + 1;
            const endIndex = name.indexOf('.json');
            const key = name.substring(startIndex, endIndex);

            if (name.startsWith('towatch-list_')) {
                newToWatchList.push(key);
                newDriveMapping[key] = id;
            } else if (name.startsWith('watched-list_')) {
                newWatchedList.push(key);
                newDriveMapping[key] = id;
            }
        });

        const newData: WatchListData = {
            toWatch: newToWatchList,
            watched: newWatchedList,
            driveMapping: newDriveMapping
        }

        this.watchListData = newData;
        this.save()

        console.log('synced with drive');
    }

    public addToWatchList(id: string) {
        if (this.watchListData.watched.includes(id))
            this.removeWatchedList(id);
        if (!this.watchListData.toWatch.includes(id)) {
            this.watchListData.toWatch.push(id);
            this.save();
            if (gDriveService.isLoggedIn)
                gDriveService.addToWatchList(id).then((driveFileId: string) => {
                    this.setDriveFileId(id, driveFileId);
                });
        }
    }

    public addWatchedList(id: string) {
        if (this.watchListData.toWatch.includes(id))
            this.removeToWatchList(id);
        if (!this.watchListData.watched.includes(id)) {
            this.watchListData.watched.push(id);
            this.save();
            if (gDriveService.isLoggedIn)
                gDriveService.addWatchedList(id).then((driveFileId: string) => {
                    this.setDriveFileId(id, driveFileId);
                });
        }
    }

    public removeToWatchList(id: string) {
        if (!this.watchListData.toWatch.includes(id)) return;
        this.watchListData.toWatch = this.watchListData.toWatch.filter((item) => item !== id);
        if (gDriveService.isLoggedIn) {
            gDriveService.deleteFile(this.getDriveFileId(id));
            this.unsetDriveFileId(id);
        }
        this.save();
    }

    public removeWatchedList(id: string) {
        if (!this.watchListData.watched.includes(id)) return;
        this.watchListData.watched = this.watchListData.watched.filter((item) => item !== id);
        if (gDriveService.isLoggedIn) {
            gDriveService.deleteFile(this.getDriveFileId(id));
            this.unsetDriveFileId(id);
        }
        this.save();
    }

    public getWatchLists(): WatchListData {
        return this.watchListData;
    }

    // public async listFilesDir(folderId: string) {
    // List files in a specific folder on Google Drive
    // return await GDriveService.listFilesDir(folderId);

    // }
}

const watchListService = new WatchListService();
export default watchListService;

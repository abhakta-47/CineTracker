import gDriveService from './gdrive'; // Your Google Drive service file

interface WatchListData {
    toWatch: string[]; // Array of IMDb IDs in to-watch list
    watched: string[]; // Array of IMDb IDs in watched list
    driveMapping: { [key: string]: string }; // Index signature for driveMapping
}

class WatchListService {
    private watchListData: WatchListData;

    constructor() {
        console.log('watchlist service constructor');
        this.watchListData = this.loadWatchListData();
        this.getDriveFiles();
    }

    private loadWatchListData(): WatchListData {
        const savedData = localStorage.getItem('watchListData');
        return savedData ? JSON.parse(savedData) : { toWatch: [], watched: [], driveMapping: {} };
    }

    private saveWatchListData() {
        localStorage.setItem('watchListData', JSON.stringify(this.watchListData));
    }

    private setDriveFileId(imdbID: string, driveId: string) {
        this.watchListData.driveMapping[imdbID] = driveId;
        this.saveWatchListData();
    }

    private getDriveFileId(imdbID: string) {
        return this.watchListData.driveMapping[imdbID];
    }

    private getDriveFiles() {
        return gDriveService.listFilesDir().then(
            data => {
                if (!data) return;
                console.log(data);
            }
        )
    }

    public addToWatchList(id: string) {
        if (this.watchListData.watched.includes(id))
            this.removeWatchedList(id);
        if (!this.watchListData.toWatch.includes(id)) {
            this.watchListData.toWatch.push(id);
            this.saveWatchListData();
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
            this.saveWatchListData();
            gDriveService.addWatchedList(id).then((driveFileId: string) => {
                this.setDriveFileId(id, driveFileId);
            });
        }
    }

    public removeToWatchList(id: string) {
        this.watchListData.toWatch = this.watchListData.toWatch.filter((item) => item !== id);
        this.saveWatchListData();
        gDriveService.deleteFile(this.getDriveFileId(id));
    }

    public removeWatchedList(id: string) {
        this.watchListData.watched = this.watchListData.watched.filter((item) => item !== id);
        this.saveWatchListData();
        gDriveService.deleteFile(this.getDriveFileId(id));
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

export {
    watchListService,
};

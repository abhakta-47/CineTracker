declare global {
  interface Window {
    gapi: any;
    google: any;
    tokenClient: any;
  }
}

interface ListItem {
  imdbID: string;
  timestamp: number;
}

class GDriveService {
  // TODO: save token, reuse old tokens, renew token

  private CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
  private API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
  private DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
  private SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file';
  private tokenClient: any;
  public isLoggedIn: boolean = false;

  constructor() {
    console.log('gdrive service constructor');

    window.gapi.load('client', async () => {
      await window.gapi.client.init({
        apiKey: this.API_KEY,
        discoveryDocs: [this.DISCOVERY_DOC],
      });
    });
    console.log('gapi loaded');

    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: this.CLIENT_ID,
      scope: this.SCOPES,
      callback: '',
    });
    console.log('gsi loaded');
  }

  private async createJSON(fileName: string, jsonObject: ListItem, parentFolder: string): Promise<string> {
    const fileMetadata = {
      'name': parentFolder + '_' + fileName + '.json',
      'mimeType': 'application/json',
      'parents': ['appDataFolder'],
      'body': JSON.stringify(jsonObject),
    };

    try {
      let service: any = window.gapi.client.drive;
      const response = await service.files.create({
        resource: fileMetadata,
      });
      console.log(response);
      // TODO return file id
      return response.result.id;
    } catch (err: any) {
      console.error('create file error', err);
      throw new Error(`Error creating file: ${err.message}`);
    }
  }

  public async getFile(fileID: string): Promise<any> {
    try {
      let service: any = window.gapi.client.drive;
      const response = await service.files.get({
        'fileId': fileID,
      });
      console.log(response);
      // todo: read file content and return JSON object
      return response;
    } catch (err: any) {
      console.error('get file error', err.message);
      throw new Error(`Error getting file: ${err.message}`);
    }
  }

  public async listFilesDir(): Promise<{ id: string, name: string }[] | null> {
    let response;
    if (!window.gapi.client.drive) {
      this.authLogin();
    }
    try {
      let service: any = window.gapi.client.drive;
      response = await service.files.list({
        spaces: 'appDataFolder',
        fields: 'nextPageToken, files(id, name)',
        pageSize: 100,
      });
      // console.log(response);
      // TODO return only list of ids
      return response.result.files;
    } catch (err: any) {
      console.error('listfile error', err.message);
      throw new Error(`Error listing files: ${err.message}`);
    }
  }

  public async deleteFile(fileId: string): Promise<any> {
    let response;
    try {
      response = await window.gapi.client.drive.files.delete({
        'fileId': fileId,
      });
      // TODO return what
      return response;
    } catch (err: any) {
      console.error('delete file error', err.message);
      throw new Error(`Error deleting file: ${err.message}`);
    }
  }

  public async addToWatchList(imdbID: string): Promise<string> {
    const timestamp = new Date().getTime();
    const jsonObject: ListItem = {
      imdbID: imdbID,
      timestamp: timestamp,
    };
    return await this.createJSON(imdbID, jsonObject, 'towatch-list');
  }

  public async addWatchedList(imdbID: string): Promise<string> {
    const timestamp = new Date().getTime();
    const jsonObject: ListItem = {
      imdbID: imdbID,
      timestamp: timestamp,
    };
    return await this.createJSON(imdbID, jsonObject, 'watched-list');
  }

  private triggerAuthCompleteEvent() {
    // Create and dispatch a custom event
    const authCompleteEvent = new Event('authComplete');
    document.dispatchEvent(authCompleteEvent);
  }

  public authLogin = async () => {
    this.tokenClient.callback = async (resp: any) => {
      if (resp.error !== undefined) {
        throw new Error(`Authentication error: ${resp.error}`);
      }
      console.log('token', resp.access_token);
      this.isLoggedIn = true;
      this.triggerAuthCompleteEvent();
    };

    if (window.gapi.client.getToken() === null) {
      this.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
      this.tokenClient.requestAccessToken({ prompt: '' });
    }
  };
}

const gDriveService = new GDriveService();

export default gDriveService;

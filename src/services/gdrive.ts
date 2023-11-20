declare global {
  interface Window {
    gapi: any;
    google: any;
    tokenClient: any;
  }
}

const CLIENT_ID = process.env.REACT_APP_GOOGLE_DRIVE_CLIENT_ID;
const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest';
// const SCOPES = 'https://www.googleapis.com/auth/drive.appdata';
const SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file';
// const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';


const initgapi = async () => {
  window.gapi.load('client', async () => {
    await window.gapi.client.init({
      apiKey: API_KEY,
      discoveryDocs: [DISCOVERY_DOC],
    });
  });
  console.log('gapi init');

  window.tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: '',
  });
  console.log('gapi token init');

};

const createJSON = async (fileName: string, jsonObject: ListItem, parentFolder: string) => {
  const fileMetadata = {
    'name': parentFolder + '_' + fileName + '.json',
    'mimeType': 'application/json',
    'parents': ['appDataFolder'],
    'body': JSON.stringify(jsonObject),
  };

  console.log('create json', fileMetadata);
  let response;
  try {
    let service: any = window.gapi.client.drive;
    response = await service.files.create({
      resource: fileMetadata,
      // media: media,
      // fields: 'id',
    });
  } catch (err: any) {
    // document.getElementById('content').innerText = err.message;
    console.error('create file error', err)
    return;
  }
  console.log(response)
};

const getFile = async () => {
  let response;
  try {
    let service: any = window.gapi.client.drive;
    response = await service.files.get({
      'fileId': '1NA-4BLzipmz0ZW4eXmqyG16XQ2DF89aG7YKAMfQjlCvXc1POLg'
    });
  } catch (err: any) {
    // document.getElementById('content').innerText = err.message;
    console.error('get file error', err.message)
    return;
  }
  console.log(response)
};

const listFilesDir = async () => {
  let response;
  try {
    let service: any = window.gapi.client.drive;
    response = await service.files.list({
      spaces: 'appDataFolder',
      fields: 'nextPageToken, files(id, name)',
      pageSize: 100,
    });
  } catch (err: any) {
    // document.getElementById('content').innerText = err.message;
    console.error('listfile error', err.message)
    return;
  }
  console.log(response)
};

const deleteFile = async (fileId: string) => {
  // delete file from appdata folder given id
  let response;
  try {
    // let service: any = window.gapi.client.drive;
    response = await window.gapi.client.drive.files.delete({
      'fileId': fileId
    });
  } catch (err: any) {
    // document.getElementById('content').innerText = err.message;
    console.error('delete file error', err.message)
    return;
  }
};

interface ListItem {
  imdbID: string;
  timestamp: number;
}

const addToWatchList = async (imdbID: string) => {
  const timestamp = new Date().getTime();
  const jsonObject: ListItem = {
    imdbID: imdbID,
    timestamp: timestamp,
  };
  let response;
  createJSON(imdbID, jsonObject, 'towatch-list');
};


const addWatchedList = async (imdbID: string) => {
  const timestamp = new Date().getTime();
  const jsonObject: ListItem = {
    imdbID: imdbID,
    timestamp: timestamp,
  };
  let response;
  createJSON(imdbID, jsonObject, 'watched-list');
};

const authLogin = async () => {
  window.tokenClient.callback = async (resp: any) => {
    if (resp.error !== undefined) {
      throw (resp);
    }
    console.log('token', resp.access_token);
  };

  if (window.gapi.client.getToken() === null) {
    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    window.tokenClient.requestAccessToken({ prompt: 'consent' });
  } else {
    // Skip display of account chooser and consent dialog for an existing session.
    window.tokenClient.requestAccessToken({ prompt: '' });
  }
};

export { initgapi, authLogin, addToWatchList, addWatchedList, listFilesDir, deleteFile, getFile };
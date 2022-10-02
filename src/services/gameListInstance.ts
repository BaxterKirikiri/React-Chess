/**
 * Class to mimic the object structure for user game lists in Firestore, so that data is easier to pass around
 */
export class gameListInstance {
    name : string;
    gid: string;

    constructor (gameName: string, gameID: string){
        this.name = gameName;
        this.gid = gameID;
    }
}
export class Categori {
    id:string;
    payer:string;
    image:File;
    type:string;
    constructor(payer,image){
        this.id="no";
        this.payer=payer;
        this.image=image;
        this.type="normal";

    }
}


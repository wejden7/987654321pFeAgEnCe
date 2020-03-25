export class Voyage {
    categorie:string;
    titre:string;
    nbjour:string;
    visibility:string;
    image:File;
    constructor(p,t,nbj,nbp,i,){
        this.categorie=p;
        this.titre=t;
        this.nbjour=nbj;
        this.visibility=nbp;
        this.image=i;
        

    }
}

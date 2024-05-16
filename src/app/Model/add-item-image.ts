export class AddItemImage {
     key!: string;
    imagename!: string;
    url!: string;
    file: File;
  
    constructor(file: File) {
      this.file = file;
    }
}


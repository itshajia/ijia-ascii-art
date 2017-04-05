namespace ijia.AsciiArt {

    export class BaseMediator extends puremvc.Mediator implements puremvc.IMediator {

        public constructor(name:string, viewComponent:any) {
            super(name, viewComponent);
        }
    }
}
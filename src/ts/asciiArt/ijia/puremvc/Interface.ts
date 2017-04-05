namespace ijia.puremvc {

    export interface ICommand
    extends INotifier
    {
        execute( notification:INotification ):void;
    }

    export interface IController
    {
        executeCommand( notification:INotification ):void;
        registerCommand( notificationName:string, commandClassRef:Function ):void;
        hasCommand( notificationName:string ):boolean;
        removeCommand( notificationName:string ):void;
    }

    export interface IFacade
    extends INotifier
    {
        registerCommand( notificationName:string, commandClassRef:Function ):void;
        removeCommand( notificationName:string ): void;
        hasCommand( notificationName:string ):boolean;
        registerProxy( proxy:IProxy ):void;
        retrieveProxy( proxyName:string ):IProxy;
        removeProxy( proxyName:string ):IProxy;
        hasProxy( proxyName:string ):boolean;
        registerMediator( mediator:IMediator ):void;
        retrieveMediator( mediatorName:string ):IMediator;
        removeMediator( mediatorName:string ):IMediator;
        hasMediator( mediatorName:string ):boolean;
        notifyObservers( notification:INotification ):void;
    }

    export interface IMediator
    extends INotifier
    {
        getMediatorName():string;
        getViewComponent():any;
        setViewComponent( viewComponent:any ):void;
        listNotificationInterests( ):string[];
        handleNotification( notification:INotification ):void;
        onRegister():void;
        onRemove():void;
    }

    export interface IModel
    {
        registerProxy( proxy:IProxy ):void;
        removeProxy( proxyName:string ):IProxy;
        retrieveProxy( proxyName:string ):IProxy;
        hasProxy( proxyName:string ):boolean;
    }

    export interface INotification
    {
        getName():string;
        setBody( body:any ):void;
        getBody():any;
        setType( type:string ):void;
        getType():string;
        toString():string;
    }

    export interface INotifier
    {
        sendNotification( name:string, body?:any, type?:string ):void;
    }

    export interface IObserver
    {
        setNotifyMethod( notifyMethod:Function ):void;
        setNotifyContext( notifyContext:any ):void;
        notifyObserver( notification:INotification ):void;
        compareNotifyContext( object:any ):boolean;
    }

    export interface IProxy
    extends INotifier
    {
        getProxyName():string;
        setData( data:any ):void;
        getData():any;
        onRegister( ):void;
        onRemove( ):void;
    }

    export interface IView
    {
        registerObserver( notificationName:string, observer:IObserver ):void;
        removeObserver( notificationName:string, notifyContext:any ):void;
        notifyObservers( notification:INotification ):void;
        registerMediator( mediator:IMediator ):void;
        retrieveMediator( mediatorName:string ):IMediator;
        removeMediator( mediatorName:string ):IMediator;
        hasMediator( mediatorName:string ):boolean;
    }
}
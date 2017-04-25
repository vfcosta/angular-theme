namespace noosfero {
    export interface Block extends RestModel {
        id: number;
        settings: Settings;
        limit: number;
        api_content: any;
        hide: boolean;
        title: string;
        type: string;
        images: Image[];
        _destroy: boolean;
        position: number;
        permissions: string[];
        box: noosfero.Box;
    }
}

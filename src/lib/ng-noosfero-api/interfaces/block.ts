namespace noosfero {
    export interface Block extends RestModel {
        id: number;
        settings: Settings;
        limit: number;
        api_content: any;
        hide: boolean;
        title: string;
        type: string;
    }
}

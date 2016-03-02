
module NgNoosferoAPI {
    export interface NoosferoHttpServiceConfig {
        protocol: string;
        hostname: string;
        port: number;
        apiPath: string;
        acceptHeader: string;
        contentTypeHeader: string;
        textEncoding: string;

    }

    export function configNoosferoHttpService(hostname: string, port?: number, protocol?: string) {
        return <NoosferoHttpServiceConfig>{
            hostname: hostname,
            port: port || 80,
            apiPath: "/api/v1",
            protocol: protocol || "http",
            acceptHeader: "application/json",
            contentTypeHeader: "application/json",
            textEncoding: "UTF-8"
        };
    }

}
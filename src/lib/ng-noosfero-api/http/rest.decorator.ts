namespace noosfero.http {
    export function Rest(config: {
        path: string
    }
    ): Function {
        let path = config.path;
        return (t: Function) => {
            if (!path) {
                throw new Error(`Rest decorator error in ${(<any>t).name}. Rest path should be provided`);
            }
            t.prototype.getPath = function() {
                return path;
            };
        };
    }
}
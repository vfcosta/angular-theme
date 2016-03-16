
namespace noosfero {
    export interface Profile  extends RestModel {
        identifier: string;
        type: string;
        name?: string;
    }
}
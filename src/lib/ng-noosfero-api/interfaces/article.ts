
namespace noosfero {
    export interface Article  extends RestModel {
        path: string;
        profile: Profile;
    }
}
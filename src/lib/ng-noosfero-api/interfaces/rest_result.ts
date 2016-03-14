
namespace noosfero {
    export interface RestResult<T> {
        data: T | T[];
        headers: Function;
    }
}
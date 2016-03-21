
namespace noosfero {
    export interface RestResult<T> {
        data: T;
        headers: Function;
    }
}
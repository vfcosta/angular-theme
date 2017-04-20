// import { Component, Input, Output, Inject, provide } from 'ng-forward';
// import { TranslateProfile } from "../../../../app/shared/pipes/translate-profile.filter";
// import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";
//
// export class SectionImageEditorComponent {
//
//     croppedDataUrl: string;
//
//     static $inject = ["picFile", "block", "blockService", "$uibModalInstance"];
//
//     constructor(public picFile: any, public block: any,
//         public blockService: BlockService,
//         public modalInstance: ng.ui.bootstrap.IModalServiceInstance) {
//     }
//
//     uploadImage(dataUrl: any, name: any) {
//         let base64ImagesJson = [this.getBase64ImageJson(dataUrl, name)];
//         angular.forEach(this.block.images, function(value, key) {
//             value.remove_image = true;
//             base64ImagesJson.push(value);
//         });
//
//         this.blockService.uploadImages(this.block, base64ImagesJson).then((result: any) => {
//             this.block.images = result.data;
//             this.modalInstance.close(name);
//         });
//
//     }
//
//     getBase64ImageJson(dataUrl: any, name: any): any {
//         let data = this.getData(dataUrl);
//         let image_name = this.getImageName(name);
//         return {
//             tempfile: data,
//             filename: image_name,
//             type: this.picFile.type
//         };
//     }
//
//     getImageName(name: any): string {
//         return this.block.id + "_" + name;
//     }
//
//     getData(dataUrl: any): string {
//         return dataUrl.substring(dataUrl.indexOf('base64,') + 7);
//     }
//
//     cancel() {
//         this.modalInstance.close();
//     }
// }

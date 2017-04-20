// import { Component, Inject, Input } from "ng-forward";
// import { SectionImageEditorComponent } from "./section-image-editor.component";
import { Component, Inject, Input, ViewChild } from '@angular/core';
// import { Component, Input, ElementRef, HostListener, ViewChild, Output, EventEmitter } from '@angular/core';

import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: "noosfero-section-block-plugin-section-block",
    template: require('plugins/section_block/blocks/section-block/section-block.html')
})
export class SectionBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() popupOpen = false;
    @Input() designMode: boolean;

    //Leandro atributtes
    profile: any;
    @ViewChild("popover") popover;
    modifiedLink: any;


    // save() {
    //     this.popupOpen = false;
    // }
    //
    // cancel() {
    //     this.popupOpen = false;
    // }


    font_color: string;
    background_color: string;

    picFile: any;
    modalInstance: any;

    constructor( @Inject('blockService') private blockService: BlockService,
        @Inject("$scope") private $scope: ng.IScope) {
        this.profile = this.owner;
    }

    ngOnInit() {
        if (this.block && this.block.settings) {
            this.font_color = this.block.settings.font_color;
            this.background_color = this.block.settings.background_color;
        }
        this.copyLink();
    }

    colors() {
        return (this.color('font', this.font_color) + ' ' + this.color('background', this.background_color));
    }

    color(color_type: string, color_value: string) {
        let css_property = '';

        if (color_type === 'font') {
            css_property = 'color:';
        }
        else {
            if (color_type === 'background') {
                css_property = 'background-color:';
            }
            else {
                return css_property;
            }
        }

        let css_style = '';

        if (color_value !== '') {
            css_style = css_property + ' #' + color_value + ';';
        }
        return css_style;
    }

    // fileSelected(file: any, errFiles: any) {
    //     if (file) {
    //         this.picFile = file;
    //         this.modalInstance = this.$uibModal.open({
    //             templateUrl: 'app/shared/components/image-upload/image-upload.html',
    //             controller: SectionImageEditorComponent,
    //             controllerAs: 'ctrl',
    //             scope: this.$scope,
    //             bindToController: true,
    //             backdrop: 'static',
    //             resolve: {
    //                 picFile: this.picFile,
    //                 block: this.block,
    //                 blockService: this.blockService
    //             }
    //         });
    //     }
    // }

    upload(data: any) {
        console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww', data);
        this.blockService.uploadImages(this.block, [data]).then((result: noosfero.RestResult<noosfero.Block>) => {


            this.block = result.data;
            // this.block.images = result.data;
            console.log('upload da imagem realizaod', this.block.images);

            // this.modalInstance.close(name);
        });
    }
    updateLink(i: any, item: any) {
        console.log('atualizando link', i, item);
        // this.images[i].title = item.name;
        // this.images[i].address = item.address;
    }

    save() {
        console.log('salvando elementos');
        this.block.settings.name = this.modifiedLink.name;
        this.block.settings.description = this.modifiedLink.description;
        // this.linkChange.emit(this.modifiedLink);
        this.popover.hide();
    }

    cancel() {
        console.log('cancelando salvar');
        this.copyLink();
        this.popover.hide();
    }

    copyLink() {
        this.modifiedLink = { name: this.block.settings.name, description: this.block.settings.description };
    }

    getSectionImage() {
        if (this.block.images && this.block.images.length >= 0) {
            return this.block.images[this.block.images.length - 1];
        } else {
            return null;
        }
    }
}


import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { MenuOverlayRef } from './menu-overlay-ref';
import { MenuComponent } from 'src/app/modules/shared/components/menu/menu.component';

interface MenuDialogConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

const DEFAULT_CONFIG: MenuDialogConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop'
};

@Injectable()
export class MenuOverlayService {

    constructor(
        private overlay: Overlay) { }

    open(config: MenuDialogConfig = DEFAULT_CONFIG) {
        // Override default configuration
        const dialogConfig = config;

        // Returns an OverlayRef which is a PortalHost
        const overlayRef = this.createOverlay(dialogConfig);

        overlayRef.backdropClick()
            .subscribe(() => {
                overlayRef.dispose();
            });

        // Instantiate remote control
        const dialogRef = new MenuOverlayRef(overlayRef);

        // Create ComponentPortal that can be attached to a PortalHost
        const filePreviewPortal = new ComponentPortal(MenuComponent);

        // Attach ComponentPortal to PortalHost
        overlayRef.attach(filePreviewPortal);

        return dialogRef;
    }


    private createOverlay(config: MenuDialogConfig) {

        const overlayConfig = this.getOverlayConfig(config);
        return this.overlay.create(overlayConfig);

    }

    private getOverlayConfig(config: MenuDialogConfig): OverlayConfig {

        const positionStrategy = this.overlay.position()
            .global()
            .centerHorizontally()
            .centerVertically();

        const overlayConfig = new OverlayConfig({
            hasBackdrop: config.hasBackdrop,
            backdropClass: config.backdropClass,
            panelClass: config.panelClass,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy
        });

        return overlayConfig;
    }
}

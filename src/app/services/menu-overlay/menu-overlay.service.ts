
import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
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

  overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay) { }

  open(config: MenuDialogConfig = DEFAULT_CONFIG) {
    // Override default configuration
    const dialogConfig = config;

    // Returns an OverlayRef which is a PortalHost
    this.overlayRef = this.createOverlay(dialogConfig);

    this.overlayRef.backdropClick()
      .subscribe(() => {
        this.overlayRef.dispose();
      });

    // Instantiate remote control
    const dialogRef = new MenuOverlayRef(this.overlayRef);

    // Create ComponentPortal that can be attached to a PortalHost
    const filePreviewPortal = new ComponentPortal(MenuComponent);

    // Attach ComponentPortal to PortalHost
    this.overlayRef.attach(filePreviewPortal);

    return dialogRef;
  }

  close() {
    if (this.overlayRef) {
      this.overlayRef.detach();
    }
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

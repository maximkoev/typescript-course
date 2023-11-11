class WareHouse {
    isProductExist(item: string): boolean {
        return true;
    }

    getWarehouseAddress(item: string): string {
        return 'warehouse address';
    }
}

class CMSSystem {
    register() {
        console.log('Order is registered');
    }

    setStatus(status: string) {
        console.log(`order status is ${status}`);
    }
}

class Delivery {
    ship(from: string, to: string) {
        console.log('Order shipping...');
    }

    getShippingStatus() {
        console.log('Your good on the way');
    }

    returnProduct() {
    }
}

class Shop {
    private wh = new WareHouse();
    private cms = new CMSSystem();
    private dl = new Delivery();

    buy(item: string, address: string) {
        this.throwErrorIfNoItem(item);
        this.cms.register();
        this.cms.setStatus('processing');
        this.dl.ship(this.wh.getWarehouseAddress(item), address);
        this.cms.setStatus('shipping')
    }

    confirmShipped() {
        this.cms.setStatus('shipped');
    }

    reclamation() {
        this.cms.setStatus('canceled');
        this.dl.returnProduct();
    }

    private throwErrorIfNoItem(item: string) {
        if (!this.wh.isProductExist(item)) {
            throw new Error('No way buy this item');
        }
    }
}
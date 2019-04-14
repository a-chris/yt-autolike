class Channel {

    constructor(_name, _status = 'on') {
        this.name = _name;
        this.status = _status;
    }

    get name() {
        return this.name;
    }

    set status(_status) {
        this.status = _status;
    }

    get status() {
        return this.status;
    }

    toString() {
        return 'Channel name: ' + this.name + 'status: ' + this.status;
    }
}
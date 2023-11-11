export class Television {
    state: boolean = false;

    on() {
        this.state = true;
    }

    off() {
        this.state = false;
    }
}

interface Command {
    execute(): any;

    undo(): any;
}

class TelevisionOnCommand implements Command {
    television: Television;

    constructor(television: Television) {
        this.television = television;
    }

    execute() {
        this.television.on();
    }

    undo() {
        this.television.off();
    }
}

class TelevisionOffCommand implements Command {
    television: Television;

    constructor(television: Television) {
        this.television = television;
    }

    execute() {
        this.television.off();
    }

    undo() {
        this.television.on();
    }
}

// the remote in this case is the caller
class Remote {
    // @ts-ignore
    onCommand: Command;
    // @ts-ignore
    offCommand: Command;

    setCommand(onCommand: Command, offCommand: Command) {
        this.onCommand = onCommand;
        this.offCommand = offCommand;
    }

    onButtonClick() {
        this.onCommand.execute();
    }

    offButtonClick() {
        this.offCommand.execute();
    }
}

let television = new Television();
let televisionOnCommand = new TelevisionOnCommand(television);
let televisionOffCommand = new TelevisionOffCommand(television);
let remote = new Remote();

remote.setCommand(televisionOnCommand, televisionOffCommand);

console.log('state of television before remote is used:', television.state);
remote.onButtonClick();
console.log('state of television after remote is used:', television.state);
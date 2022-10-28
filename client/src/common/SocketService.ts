import { io, Socket } from "socket.io-client";

class SocketService {
	private socket: Socket | null = null;;

	connect(id: string) {
		this.socket = io("http://localhost:8000", {
			auth: {
				playerId: id
			},
		});
	}

	emit<T>(event: string, data: any): Promise<T> {
    return new Promise<T>(
			(resolve, reject) => {
				if (!this.socket) return reject('No socket connection.');

				return this.socket.emit(event, data, (response: T) => {
					return resolve(response);
				});
    	}
		);
  }

	on(event: string, callback: (...args: any[]) => any) {
		this.socket?.on(event, callback);
	}
}

export default new SocketService();
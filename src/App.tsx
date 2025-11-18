import React from "react";

interface AppProps {}
interface AppState {}

class App extends React.Component<AppProps, AppState> {
	render() {
		return (
			<div style={{ padding: 24, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif", fontSize: 20 }}>
				<strong>Etkinlik Detay Make</strong>
			</div>
		);
	}
}

export default App;



const {useState, useEffect} = React;
const {AppBar, Container, CssBaseline, Card, Button, Box, Toolbar, TextField, Typography, Spacing} = MaterialUI;

function App(){
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState("");
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        const userName = prompt("What is your name?") || "UnknownUser";

        showData(isHidden, setIsHidden, messages, setMessages);
        setUser(userName);
    }, []);

    function sendMessage(value){
    	sendData(user, value);
    }

    return (
        <>
            {!isHidden && <Loader/>}
            <Header/>
            <MessageForm sendMessage={sendMessage}/>
            <Messages data={messages}/>
        </>
    );
}

function Loader(){
    return (
        <div class="loader loader-default is-active" data-text="Just a sec..."></div>
    );   
}

function Header(){
    return (
        <>
            <CssBaseline/>
            <AppBar style={{alignItems: "Center"}} position="relative">
                <Toolbar>
                    <span style={{marginTop: "3px", marginRight: "10px"}} class="material-icons"> chat </span>
                    <Typography variant="h6"> React Chat Application </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

function MessageForm(props){
    const [message, setMessage] = useState("");

    function handleChange(e){
        setMessage(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        if (message){
            props.sendMessage(message);
        }
        setMessage("");
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="center" marginTop={5} marginBottom={5}>
            <form onSubmit={handleSubmit}>
                <TextField id="standard-basic" type="text" onChange={handleChange} label="Enter message..." value={message}/>
                <Button type="submit" variant="contained" color="primary"> Send </Button>
            </form>
        </Box>
    );
}

function Messages(props){
    const arr = props.data;
    const list = arr.slice(0).reverse().map((v, i) => {
        return (
            <Card style={{backgroundColor: "#2f7dfa", marginBottom: "10px", paddingTop: "10px"}} key={i}>
                <Typography style={{color: "white"}} variant="h6" align="center" paragraph> {v} </Typography>
            </Card>
        );
    });

    return (
        <Container> {list} </Container>
    );
}

ReactDOM.render(<App/>, document.querySelector("#root"));
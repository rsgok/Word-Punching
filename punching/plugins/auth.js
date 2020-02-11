export default function ({ $auth }) {
    $auth.onError((error, name, endpoint) => {
        console.log("fail or error");
        
        console.error(name, error)
    })
}

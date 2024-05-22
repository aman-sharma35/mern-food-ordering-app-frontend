// import { useCreateMyUser } from "@/api/MyUserApi";
import { AppState, Auth0Provider} from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
// import { Navigate} from "react-router-dom";

type Props = {
    children: React.ReactNode;
}

const Auth0providerWithNavigate = ({ children }: Props) => {
    const navigate = useNavigate();

    // const { createUser } = useCreateMyUser(); //this create user is is it's the is the mutate async function that we are exposing in the my user API
    const domain = import.meta.env.VITE_AUTH0_DOMAIN;
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL;
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
    console.log(domain);
    if (!domain || !clientId || !redirectUri || !audience) {
        throw new Error("unable to initialise auth");
    }


    const onRedirectCallback = (appState?: AppState) => {
        navigate(appState?.returnTo || "/auth-callback");
    };

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
                redirect_uri: redirectUri,
                audience,
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    );



}

export default Auth0providerWithNavigate;

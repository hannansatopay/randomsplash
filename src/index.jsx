// Importing required components from Forge UI library
import ForgeUI, { render, Text, Fragment, Image, useAction} from '@forge/ui';
// Importing the api object
import api from "@forge/api";

// Interface to be used by our getRandom function
interface Json {
	title: string;
    url: string;
}

// getRandom function makes the Unsplash API call to get a random image and filter out title and url
const getRandom = async (): Promise<Json> => {

    const response = await api.fetch("https://api.unsplash.com/photos/random?client_id="+process.env.API_KEY+"&orientation=landscape");

    const data = await response.json();
	
	const url = data['urls']['regular'];
	
	const title = "Photo by ["+data['user']['name']+"](https://unsplash.com/@"+data['user']['username']+"?utm_source=random_splash&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=random_splash&utm_medium=referral)";
	
	api.fetch("https://api.unsplash.com/photos/"+data['id']+"/download?client_id="+process.env.API_KEY);

    return {
		title,
        url
    };
};

// ImageCardProps interface which will be used by ImageCard component
interface ImageCardProps {
	title: string;
    src: string;
}

// ImageCard component containing text and image
const ImageCard = ({title, src}: ImageCardProps) => (
	<Fragment>
	    <Text content={title}/>
        <Image src={src} alt={title}/>
	</Fragment>
);

// App function will return the final output
const App = () => {
    const [{ title, url }, setRandom] = useAction(getRandom, getRandom);

    return (
            <ImageCard src={url} title={title}/>
    );
};

// Exporting the above App function by exporting via 'run'
export const run = render(<App/>);
/**
 *  see how many location matched with the food prfernce:
 * if match, get 1 point
 * if not match, get 0 point
 * sort the list of location with their macthing score
 * @param  food prference list, location list
 * @returns array of dining locations based on food preferece
 */


const fetchData = async () => {
    const response = await fetch(`https://umasseatthis.herokuapp.com/dining`);

    if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
    }

    const records = await response.json();
    


}
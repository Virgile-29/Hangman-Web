/**
 * Using fetch to get a random french word
 * https://trouve-mot.fr/api/random
 */
export async function getWord() {
    const response = await fetch("https://trouve-mot.fr/api/random")
    if(response.ok) {
        return response.json()
    } 
    return response.status
}

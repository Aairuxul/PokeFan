import { getPicturePokemon } from "../(services)/pokemonAPI";

async function NavMenue() {
    let randomNumber = Math.floor(Math.random() * 100) + 1;

    let profilePicture = await getPicturePokemon(randomNumber);
  return (
    <nav className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      <div className="text-lg font-bold"></div>
      <ul className="flex space-x-4">
        <li><a href="/" className="hover:text-gray-400">Compta</a></li>
      </ul>
      <div>
        {profilePicture && <img src={profilePicture.sprites.front_default} alt="Profile" className="w-8 h-8 rounded-full" />}
      </div>
    </nav>
  )
}

export default NavMenue;
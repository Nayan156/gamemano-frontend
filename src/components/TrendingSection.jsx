import GameCard from './GameCard';
import Image from 'next/image';

export default function TrendingSection({ games }) {
  return (
    <div className="mb-12 ml-5 mt-5">
      {/* <div className="flex items-center justify-between mr-4 mt-10 mb-10">
        <Image src="/MostTrending.png" alt="Most Trending Logo" width={400} height={400}/>
        <a href="/products" className="text-lg font-Poppins text-white hover:text-orange-300 hover:underline ">{"GO TO GAME STORE ->"}</a>
      </div> */}
      <div className="w-full flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 mt-10 mb-10 px-4 sm:px-8">
  <Image
    src="/MostTrending.png"
    alt="Most Trending Logo"
    width={400}
    height={400}
    className="w-[220px] sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto"
  />
  
  <a
    href="/products"
    className="text-base sm:text-lg font-Poppins text-white hover:text-orange-300 hover:underline mt-4 sm:mt-0"
  >
    {"GO TO GAME STORE ->"}
  </a>
</div>


      <div className="flex flex-col sm:flex-row gap-5 overflow-x-auto sm:overflow-x-auto overflow-y-visible pb-4 px-2 sm:px-4 md:px-0 hide-scrollbar">
        {games.map(game => (
          <div
            key={game.id}
            className="flex-shrink-0 w-72 sm:w-72 md:w-80 lg:w-[341px]"
          >
            <GameCard game={game} />
          </div>
        ))}
      </div>


    </div>
  );
}

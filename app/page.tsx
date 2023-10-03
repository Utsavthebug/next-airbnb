import getCurrentUser from "./actions/getCurrentUser";
import getListing from "./actions/getListing";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing } from "./types";

export default async function Home() {
  
  const listings = await getListing()
  const currentUser = await getCurrentUser()


  if(listings.length===0){
    return <EmptyState showReset />
  }

  return (
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3
        lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 pt-24">
             {
              listings.map((listing:SafeListing)=>(
               <ListingCard  
               currentUser={currentUser}
               key={listing.id}
               data={listing}
               />
              ))
             }
        </div>
      </Container>
    )
}

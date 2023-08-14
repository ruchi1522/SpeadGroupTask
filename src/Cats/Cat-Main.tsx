import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import CatBreedDetails from './Cat-Breed-Details';
import { useNavigate  } from 'react-router-dom';




const API_URL = 'https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1&api_key=db933426-eb41-4dbc-9cda-60bc56b6d916';
const Detail_url = 'https://api.thecatapi.com/v1/images/';
interface Cat {
  id: string;
  url: string;
}

 export interface CatDetails {
  id: string;
  url: string;
  breeds: Breed[];
  height:number;
}

 export interface Breed {
  weight: {
    imperial: string;
    metric: string;
  };
  height:string;
  id: string;
  name: string;
  cfa_url: string;
  vetstreet_url: string;
  life_span: string;
  temperament: string;
}

export default function CatsMain() {
  const navigate = useNavigate();
  const [cats, setCatData] = useState<Cat[]>([]);
  const [catDetails, setCatDetails] = useState<CatDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData(API_URL, currentPage);
  }, [currentPage]);

  async function fetchData(url: string, page: number) {
    try {
      const response = await fetch(`${url}&page=${page}`);
      if (response.ok) {
        const data: Cat[] = await response.json();
        setCatData(data);
        if(data){
          fetchCatDetails(data);
        }
      } else {
        // Handle error if needed
      }
    } catch (error) {
      // Handle error if needed
    }
  }

  async function fetchCatDetails(catData: Cat[]) {
    try {
      const detailsPromises = catData.map(async element => {
        const response = await fetch(Detail_url + element.id);
        if (response.ok) {
          const catdetaildata: CatDetails = await response.json();
          return catdetaildata;
        } else {
          // Handle error if needed
          return null;
        }
      });

      const catDetailsArray = await Promise.all(detailsPromises);
      const filteredCatDetails = catDetailsArray.filter(detail => detail !== null) as CatDetails[];
      setCatDetails(filteredCatDetails);
      console.log(filteredCatDetails);
      setLoading(false); 
    } catch (error) {
      // Handle error if needed
    }
  }

  const handleImageClick = (catData: CatDetails) => {

    // Navigate to the CatDetail page and pass catData as state
    navigate(`/cat/${catData.id}`, { state: { catData } });
  };



  return (
    <div>
      <header>
        <h2>List of Cats</h2>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-24 card">
            <div className="card-body">
              {loading ? (
                <p>Loading...</p>
              ) : (
                cats.map((cat) => {
                  const catDetail = catDetails.find(
                    (detail) => detail && detail.id === cat.id
                  );
                  const breedName =
                    catDetail && catDetail.breeds.length > 0
                      ? catDetail.breeds[0].name
                      : 'Unknown Breed';
                  return (
                    <div key={cat.id}>
                     <img src={cat.url} alt={`Cat ${cat.id}`} width={400} height={400} onClick={() => catDetail && handleImageClick(catDetail)}
                        style={{ cursor: 'pointer' }} />
                      {catDetail && (
                        <>
                            <p className="card-text">Breed: {breedName}</p>
                    
                        </>
                      )}
                    </div>
                  );
                })
              
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button
              className="btn btn-primary me-2 btn-lg"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={cats.length < 10}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
  


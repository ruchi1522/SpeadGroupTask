import React, { useEffect, useState } from 'react';
import { useLocation , useNavigate} from 'react-router-dom';
import { Breed,CatDetails } from './Cat-Main';
import 'bootstrap/dist/css/bootstrap.min.css'


const CatBreedDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { catData } = location.state as { catData: CatDetails };

  const [isLoading, setIsLoading] = useState(true);
  const [allBreeds, setAllBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    

   const breeds = catData.breeds as Breed[];

    // Set the populated breeds array and loading as false
    setAllBreeds(breeds);
    setIsLoading(false);
  }, [catData]);
  
  return (
    <div className="container">
        <div className="row">
          <div className="col-md-24">
          <div className='card'>
              <div className="card-body">
              {allBreeds.map(breed => (
              <div key={breed.id}>
                <img src={catData.url} alt={`Cat Breed`} width={400} height={400} />
                <p>Breed Name: {breed.name}</p>
                <p>Breed Temperament: {breed.temperament}</p>
                <p>Life Span: {breed.life_span}</p>
                <p>Breed Weight: {breed.weight.metric} kg</p>
                {/* <p>Breed Height: {catData.height}</p> */}

              </div>
            ))}
            </div>
            </div>
          </div>
        </div>
        <div className="row">
        <div className="col-sm-12">
        <button className='btn btn-primary me-2 btn-lg'
                onClick={() => navigate(-1)} >
          Back
        </button>
        
      </div>
      </div>
      
    </div>
  );
};

  export default CatBreedDetails;
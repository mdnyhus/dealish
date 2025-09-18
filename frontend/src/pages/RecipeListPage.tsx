import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import PageContainer from '../components/PageContainer';

type Recipe = {
  id: number;
  name: string;
  description?: string;
};

export default function RecipeListPage() {
  const {postalCode} = useParams<{postalCode: string}>();
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch(
          `http://localhost:8000/recipes?postalCode=${postalCode}`
        );
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        console.error('Failed to fetch recipes', err);
      }
    }
    fetchRecipes();
  }, [postalCode]);

  return (
    <PageContainer>
      <main className='flex flex-col p-4 gap-4'>
        <h2 className='text-xl font-semibold'>
          Recipes near {postalCode?.toUpperCase()}
        </h2>
        {recipes.length === 0 ? (
          <p>No recipes found.</p>
        ) : (
          <ul className='space-y-2'>
            {recipes.map((recipe) => (
              <li key={recipe.id} className='p-4 border rounded shadow'>
                <h3 className='text-lg font-bold'>{recipe.name}</h3>
                <p className='text-gray-600'>{recipe.description}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </PageContainer>
  );
}

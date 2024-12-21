import { Suspense } from 'react';
import { HomeLayout } from './components/HomeLayout';

type SearchParams = {
  menu_id: string;
  restaurant_id: string;
};

export default async function Home({ searchParams }: { searchParams: SearchParams }) {
  const menuId = searchParams?.menu_id || '';
  const restaurantId = searchParams?.restaurant_id || '';
  if (!menuId || !restaurantId)
    return (
      <div className="flex h-screen items-center justify-center">
        <h4>No item is found</h4>
      </div>
    );

  const res = await fetch(
    `https://api.brilliantdine.com/restaurant/${restaurantId}/menu/${menuId}/details`,
  );
  const data = await res.json();

  return (
    <Suspense>
      <HomeLayout data={data} />
    </Suspense>
  );
}

'use client';

import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CategoryBoxProps {
  icon: IconType,
  label: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon: Icon,
  label,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};
    
    if (params) {
      //huidige url opgehaald
      currentQuery = qs.parse(params.toString())
    }

    // een query wordt aangemaakt met de huidige url en de category is label
    const updatedQuery: any = {
      ...currentQuery,
      category: label
    }

    // als de category parameter in de huidige query hetzelfde is als 
    // het label, wordt de category verwijderd
    if (params?.get('category') === label) {
      delete updatedQuery.category;
    }

    //De bijgewerkte query wordt omgezet naar een URL 
    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery
    }, { skipNull: true });

    //Ten slotte wordt de router gebruikt om naar de nieuwe URL te navigeren 
    router.push(url);
  }, [label, router, params]);

  return ( 
    <div
      onClick={handleClick}
      className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? 'border-b-neutral-800' : 'border-transparent'}
        ${selected ? 'text-neutral-800' : 'text-neutral-500'}
      `}
    >
      <Icon size={26} />
      <div className="font-medium text-sm">
        {label}
      </div>
    </div>
   );
}
 
export default CategoryBox;
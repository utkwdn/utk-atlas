import React from 'react';
import { client } from 'client';

interface TaggedPageProps {
    id;
    contentType;
    typeName;
}

export default function TaggedPage({ id, contentType, typeName }: TaggedPageProps): JSX.Element {
    const { useQuery } = client;

    console.log(id);
    console.log(contentType);
    

    if(contentType === 'TimelineEvent'){
        var contentCall = 'timelineEvent';
    }else{
        contentCall = contentType;
    }

    //const thisQuery = useQuery()[contentCall];

   
    //var thisPage = useQuery()[contentCall]({id: id});

    //this works
    console.log(useQuery()[contentCall]);

    //but this throws a compile error
    //console.log(useQuery()[contentCall]({id: id}));

  return (
    <div>
      <h3>{//thisPage.title()
      }
      </h3>
    </div>
  );
}
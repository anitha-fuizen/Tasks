/*eslint-disable*/
import * as React from 'react'
import { IMytasksProps } from './IMytasksProps'
import "@pnp/sp/fields";
import "@pnp/sp/lists"

import {
  DetailsList, DetailsListLayoutMode,
 
} from "office-ui-fabric-react/lib/DetailsList";
import { getSP } from './pnpConfig';
import { SPFI } from '@pnp/sp';

const Mytasks = (props: IMytasksProps) => {
  
  const [rowData, setRowData] = React.useState([])
  const [final,setFinal]=React.useState([])
  let columnArr = new Array();
  let filteredarr = new Array();
  let filteredobj: any
  console.log(props.ListName);
  
  const getdata = async () => {
    
      
      const sp:SPFI = getSP(props.context)
    
        let view = await sp.web.lists.getByTitle(props.ListName).items.select()()
        console.log(view);

        view.map((y: any) => { Object.keys(y).filter(x => x !== "odata.type" && x !== "odata.id" && x !== "odata.etag" && x !== "odata.editLink" && x !== "FileSystemObjectType" && x !== "ServerRedirectedEmbedUri" && x !== "ServerRedirectedEmbedUrl" && x !== "ContentTypeId" && x !== "ComplianceAssetId" && x !== "OData__ColorTag" && x !== "Modified" && x !== "Created" && x !== "AuthorId" && x !== "EditorId" && x !== "OData__UIVersionString" && x !== "Attachments" && x !== "GUID" && x !== "Id" && x !=="Title").map((x: any) => { console.log(x); columnArr.push(x) }) })
        view.map((x: any,i:number) => {
         
          filteredobj = Object.assign({}, ...columnArr.map(key => ({ [key]: x[key] })))
          console.log(filteredobj);
          filteredarr.push(filteredobj)
          
        })
        console.log(filteredobj);
        console.log(filteredarr);
         console.log(Object.keys(filteredobj))
        
         const keyobj=Object.keys(filteredobj)
         console.log(keyobj)        
        setRowData(filteredarr)
        
      
        const columns=new Array();
     
       
          Object.keys(filteredobj).map((x,i)=>{
            columns.push({key:"_column"+i,name:x,fieldName:x,minWidth:100,
          maxWidth: 100,
          isResizable: true})
          
         

        })
      setFinal(columns)

}

React.useEffect(()=>{getdata()},[])

  return (<>
    
{console.log(final)}
     
   
    { <DetailsList 
    
    columns={final}
    items={rowData}
    setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
         selectionPreservedOnEmptyClick={true}
   
    /> }
  </>)
}

export default Mytasks;

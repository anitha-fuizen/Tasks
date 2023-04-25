
import * as React from 'react'
import { IMytasksProps } from './IMytasksProps'
import "@pnp/sp/fields";
import "@pnp/sp/lists"
import { sp } from 'sp-pnp-js';
import {
  DetailsList, DetailsListLayoutMode,
 
} from "office-ui-fabric-react/lib/DetailsList";
const Mytasks = (props: IMytasksProps) => {
  // const [data,setData] = React.useState<any>()  
  const [rowData, setRowData] = React.useState([])
  const [final,setFinal]=React.useState([])
  let columnArr = new Array();
  let filteredarr = new Array();
  let filteredobj: any
  const getdata = async () => {
    try {

      //const list=await _sp.web.lists.getByTitle(props.ListName).items();
      // const list=sp.web.lists.getByTitle(props.ListName)
      // const items=await list.items.getAll();
      // console.log(items);

      //  sp.web.lists.getByTitle(props.ListName).fields.filter("Hidden eq false").select("Title").get().then((result)=>{
      //    const columns=result.map((column: { Title: any; })=>column.Title);
      //    console.log(columns)
      //  })

      await sp.web.lists.getByTitle(props.ListName).items.get().then((view) => {
        console.log(view);

        view.map((y: any) => { Object.keys(y).filter(x => x !== "odata.type" && x !== "odata.id" && x !== "odata.etag" && x !== "odata.editLink" && x !== "FileSystemObjectType" && x !== "ServerRedirectedEmbedUri" && x !== "ServerRedirectedEmbedUrl" && x !== "ContentTypeId" && x !== "ComplianceAssetId" && x !== "OData__ColorTag" && x !== "Modified" && x !== "Created" && x !== "AuthorId" && x !== "EditorId" && x !== "OData__UIVersionString" && x !== "Attachments" && x !== "GUID" && x !== "Id" && x !=="Title").map((x: any) => { console.log(x); columnArr.push(x) }) })

        //view.map((y: any) => { Object.values(y).filter(x => x !== "odata.type" && x !== "odata.id" && x !== "odata.etag" && x !== "odata.editLink" && x !== "FileSystemObjectType" && x !== "ServerRedirectedEmbedUri" && x !== "ServerRedirectedEmbedUrl" && x !== "ContentTypeId" && x !== "ComplianceAssetId" && x !== "OData__ColorTag" && x !== "Modified" && x !== "Created" && x !== "AuthorId" && x !== "EditorId" && x !== "OData__UIVersionString" && x !== "Attachments" && x !== "GUID" && x !== "Id").map((x: any) => { console.log(x); columndataArr.push(x) }) })

        // view.map((x:any)=>{columndataArr.push(x)})


        view.map((x: any,i:number) => {
         
          filteredobj = Object.assign({}, ...columnArr.map(key => ({ [key]: x[key] })))
          console.log(filteredobj);
          filteredarr.push(filteredobj)
          
        })
        console.log(filteredobj);
        console.log(filteredarr);
        // console.log(Object.keys(filteredobj))
        
        // const keyobj=Object.keys(filteredobj)
        
        setRowData(filteredarr)
        
      
        let _columns=new Array();
        try{
        // columnArr.map((x:any,i:number)=>{
        //   _columns.push({key:"_column"+i,name:columnArr[i],fieldName:columnArr[i],minWidth: 100,
        //   maxWidth: 100,
        //   isResizable: true})
          

        //   })
          Object.keys(filteredobj).map((x,i)=>{
            _columns.push({key:"_column"+i,name:x,fieldName:x,minWidth:100,
          maxWidth: 100,
          isResizable: true})
          
          //return _columns;

        })}
       
        catch(error){
        console.log(error)

        }
        setFinal(_columns)

})

}
    catch (error) {
      console.log(error);
    }

}
  
  React.useEffect(() => {
    getdata()
  }, [])


  return (<>
    
{console.log(final)}
     
   
    { <DetailsList 
    
    columns={final}
    items={rowData}
    setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          //selection={selection}
          selectionPreservedOnEmptyClick={true}
   
    /> }
  </>)
}

export default Mytasks
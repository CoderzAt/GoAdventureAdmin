export function gettingMultiselectValues(ids,list)
{
    let traveltypeids=(ids).split(",");
    let traveltypenames1=[]

    traveltypeids.map(obj=>
        list.map((item)=>{
            if(parseInt(obj) == item.travelTypeId)
            {
              traveltypenames1.push({travelTypeName:item.travelTypeName,travelTypeId:item.travelTypeId});
            }
        }))

        return traveltypenames1
}
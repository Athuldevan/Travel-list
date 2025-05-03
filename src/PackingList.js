import { useState } from "react";
import Item from './Item'
// PACKINGLIST COMPONENT
export default function Packinglist({items, onDeleteitem , onToggleItems, onClearList}) {
    const [sortBy, setSortBy] = useState("input");
  
  
  
    let sortedItems;
  
    if(sortBy === 'input' )  sortedItems = items;
  
    if(sortBy === 'description') 
      sortedItems =items.slice().sort((a,b) => a.description.localeCompare(b.description))
  
    if(sortBy === 'packed') 
      sortedItems = items.sort((a,b) => Number(a.packed) - Number(b.packed))
  
      
  
    return (
      <div className="list">
        <ul>
          {sortedItems.map((item) =>  (
            <Item item={item} onDeleteitem={onDeleteitem}  onToggleItems = {onToggleItems} key={item.id} />
            
          ))}
        </ul>
  
        <div className="actions">
          <select value = {sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="input"> sort by input order</option>
            <option value="description"> sort by description</option>
            <option value="packed"> sort by packed Status</option>
          </select>
          <button onClick={onClearList}>clear</button>
        </div>
      </div>
    );
  }
  
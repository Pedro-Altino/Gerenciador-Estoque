import React from 'react'

export default function Toolbar({ query, setQuery, onOpenAdd, onOpenSale }){
  return (
    <div className="toolbar">
      <div className="search-wrap">
        <input className="search" placeholder="Pesquisar produto..." value={query} onChange={(e)=>setQuery(e.target.value)} />
        <button className="search-btn" type="button" aria-label="Pesquisar">
          <span className="search-icon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </span>
          <span>Pesquisar</span>
        </button>
      </div>
      <div style={{display:'flex', gap:10, alignItems:'center'}}>
        <button className="btn add-button" onClick={onOpenAdd} aria-controls="product-modal">Cadastrar Produto</button>
        <button className="btn sales-button" onClick={()=>onOpenSale(null)} aria-controls="sale-modal" title="Registrar venda">Registrar Venda</button>
        <div className="view-toggle" />
      </div>
    </div>
  )
}

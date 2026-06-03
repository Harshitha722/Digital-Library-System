import Navbar
from "../components/Navbar";

import Sidebar
from "../components/Sidebar";

const BorrowHistory = () => {

 return(

 <>
 <Navbar />

 <div className="dashboard-layout">

  <Sidebar />

  <div className="books-container">

   <h2>
    Borrow History
   </h2>

   <p>
    Borrow records
    will appear here.
   </p>

  </div>

 </div>
 </>
 );
};

export default BorrowHistory;
import "./App.css";
import { useEffect, useState } from "react";
import "./style.css";

const App = () => {
  const [endUsers, setEndUsers] = useState([]);
  const [search, setSearch] = useState("");
  const idb = window.indexedDB;
  const createIndexedDB = () => {
    if (!idb) {
      console.log(`This browser does't support indexDB`);
      return;
    }
    const request = indexedDB.open("pocDatabase", 1);
    request.onerror = (event) => {
      console.log(event, "ERROR");
    };
    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("endUsers")) {
        const store = db.createObjectStore("endUsers", { keyPath: "id" });
        store.createIndex("phone_index", ["phone"], { unique: false });
        store.createIndex("fullname", ["firstname", "lastname"], {unique: false});
      }
    };
    request.onsuccess = (event) => {
      console.log("Database opened successfully!");
    };
  };

  const getAllData = () => {
    const dbObject = idb.open("pocDatabase", 1);
    dbObject.onsuccess = () => {
      const db = dbObject.result;
      const txn = db.transaction("endUsers", "readonly");
      const endUsersData = txn.objectStore("endUsers");
      const endUsers = endUsersData.getAll();
      endUsers.onsuccess = (query) => {
        setEndUsers(query.srcElement.result);
      };
      endUsers.onerror = () => {
        console.log("An error occurred while loading the data");
      };
    };
  };

  const addInitialDataIntoDB = (response) => {
    console.log(response);
    const dbObject = idb.open("pocDatabase", 1);
    dbObject.onsuccess = () => {
      const db = dbObject.result;
      const txn = db.transaction("endUsers", "readwrite");
      const endUsersData = txn.objectStore("endUsers");
      if (response?.data?.data?.length) {
        response.data.data.forEach((ele) => {
          endUsersData.add(ele);
        });
        getAllData();
      }
    };
  };

  const fetchInitialData = async () => {
    await fetch(
      "https://onecontractoruat.pidilite.com/apis/v.1.0/basant-leads?mdicode__c=SDETEST&mh2code__c=SDETEST&divisioncode__c=70&search=&limit=300&offset=0",
      {
        headers: {
          Authorization:
            "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NDMwOTAzLCJqdGkiOiI0MDUzZmQ1ZThkMzE0MmMwYWFjOGZmYTM2YzRiMGNlNSIsInBob25lIjoiODk4MDU3Nzc3NyIsInN1YiI6IkNNREktVG9rZW4iLCJjbWRpX2NvZGUiOiJFSVRFU1QyIiwibmFtZSI6IkNNREkiLCJjbWRpX3NmaWQiOiJhMDAydjAwMDA0WUdNRTBBQVAiLCJjbWRpX3JlY29yZHR5cGVuYW1lX2MiOiJFSSIsImlzcyI6IlBpZGlsaXRlLU9uZS1Db3JlIn0.LkPKlODWktlxJibAsO4BgfuYhZX7tupR5K0cgZwHgiU",
        },
      }
    ).then(async (res) => addInitialDataIntoDB(await res.json()));
  };

  // const onSearch = () => {
  //   const globalSearch = search.trim().toLowerCase();
  //   const dbObject = idb.open("pocDatabase", 1);
  //   dbObject.onsuccess = () => {
  //     const db = dbObject.result;
  //     const cursorRequest = db
  //       .transaction(["endUsers"], "readonly")
  //       .objectStore("endUsers")
  //       .openCursor();
  //     const tempEndUsers = [];
  //     cursorRequest.onsuccess = (e) => {
  //       const cursor = e.target.result;
  //       if (cursor) {
  //         if (
  //           String(cursor.value.id).includes(globalSearch) ||
  //           ((cursor.value.firstname || cursor.value.lastname) &&
  //             `${cursor.value.firstname.toLowerCase()} ${cursor.value.lastname.toLowerCase()}`.includes(
  //               globalSearch
  //             )) ||
  //           (cursor.value.phone &&
  //             cursor.value.phone.toLowerCase().includes(globalSearch)) ||
  //           (cursor.value.membershipno_c &&
  //             cursor.value.membershipno_c.toLowerCase().includes(globalSearch))
  //         ) {
  //           tempEndUsers.push(cursor.value);
  //         }
  //         cursor.continue();
  //       } else {
  //         setEndUsers(tempEndUsers);
  //       }
  //     };
  //   };
  // };

  const onSearch = () => {
    const globalSearch = search.trim().toLowerCase();
    const dbObject = idb.open("pocDatabase", 1);
    
    dbObject.onsuccess = () => {
      const db = dbObject.result;
      const cursorRequest = db
        .transaction(["endUsers"], "readonly")
        .objectStore("endUsers")
        .index("fullname") 
        .openCursor(IDBKeyRange.lowerBound(globalSearch));
  
      const tempEndUsers = [];
  
      cursorRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          const user = cursor.value;
          // Check if any of the fields match the search term
          if (
            String(user.id).includes(globalSearch) ||
            (`${user.firstname} ${user.lastname}`.toLowerCase().includes(globalSearch)) ||
            (user?.phone.toLowerCase().includes(globalSearch)) ||
            (user.membershipno_c?.toLowerCase().includes(globalSearch))
          ) {
            tempEndUsers.push(user);
          }
          cursor.continue();
        } else {
          setEndUsers(tempEndUsers);
        }
      };
    };
  };
  
  

  const onClear = () => {
    setSearch("");
    const dbObject = idb.open("pocDatabase", 1);
    dbObject.onsuccess = () => {
      const db = dbObject.result;
      const txn = db.transaction("endUsers", "readonly");
      const endUsersData = txn.objectStore("endUsers");
      const endUsers = endUsersData.getAll();
      endUsers.onsuccess = (query) => {
        setEndUsers(query.srcElement.result);
      };
      endUsers.onerror = () => {
        console.log("An error occurred while loading the data");
      };
    };
  };

  useEffect(() => {
    createIndexedDB();
    fetchInitialData();
  }, []);

  return (
    <div className="p-20px">
      <div style={{marginBottom: 20}}>
      <input
        style={{padding: 8, marginRight: 10}}
        value={search}
        placeholder="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button style={{padding: 8, marginRight: 10}} onClick={onSearch}>Search</button>
      <button style={{padding: 8}} value={search} onClick={onClear}>
        Clear
      </button>
      </div>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>Sr No.</th>
            <th style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>Id</th>
            <th style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>Phone</th>
            <th style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>Membership No.</th>
          </tr>
        </thead>
        <tbody>
          {endUsers.map((ele, index) => (
            <tr key={`${index + 1}`}>
              <td style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>{index + 1}</td>
              <td style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>{ele.id}</td>
              <td style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>
                {ele.firstname} {ele.lastname}
              </td>
              <td style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>{ele.phone}</td>
              <td style={{ padding: '8px', border: '1px solid #dddddd', textAlign: 'left' }}>{ele.membershipno_c}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {!endUsers.length && <p style={{textAlign: "center"}}>No Data Found!</p>}
    </div>
  );
};

export default App;


// import React, { useEffect, useState } from 'react';

// const contacts = [
//   { id: 1, firstName: "John", lastName: "Doe", phoneNo: "123-456-7890" },
//   { id: 2, firstName: "Jane", lastName: "Smith", phoneNo: "987-654-3210" },
//   { id: 3, firstName: "Alice", lastName: "Johnson", phoneNo: "555-123-4567" },
//   { id: 4, firstName: "Bob", lastName: "Brown", phoneNo: "444-567-8901" },
//   { id: 5, firstName: "Emily", lastName: "Davis", phoneNo: "222-333-4444" },
//   { id: 6, firstName: "Michael", lastName: "Wilson", phoneNo: "999-888-7777" },
//   { id: 7, firstName: "Sarah", lastName: "Taylor", phoneNo: "777-555-3333" },
//   { id: 8, firstName: "David", lastName: "Martinez", phoneNo: "111-222-3333" },
//   { id: 9, firstName: "Sophia", lastName: "Anderson", phoneNo: "666-777-8888" },
//   { id: 10, firstName: "James", lastName: "Lee", phoneNo: "333-444-5555" }
// ];

// function App() {
//   const [contactsData, setContactsData] = useState([])
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [db, setDb] = useState(null);

//   useEffect(() => {
//     // Open or create the IndexedDB database
//     const request = window.indexedDB.open('contactsDB', 1);

//     request.onerror = function(event) {
//       console.error("Database error: " + event.target.errorCode);
//     };

//     request.onupgradeneeded = function(event) {
//       const db = event.target.result;
      
//       // Create an object store (table) to store contacts
//       const objectStore = db.createObjectStore("contacts", { keyPath: "id" });

//       // Define the structure of the data
//       objectStore.createIndex("lastName", "lastName", { unique: false });
//       objectStore.createIndex("phoneNo", "phoneNo", { unique: false });
//       objectStore.createIndex("firstName", "firstName", { unique: false });

//       // Populate the object store with data from the array
//       const transaction = event.target.transaction;
//       const contactsStore = transaction.objectStore("contacts");
//       contacts.forEach(contact => {
//         contactsStore.add(contact);
//       });
//     };

//     request.onsuccess = function(event) {
//       const db = event.target.result;
//       console.log("Database opened successfully");
//       setDb(db)

//       const transaction = db.transaction(["contacts"], "readonly");
//       const objectStore = transaction.objectStore("contacts");
//       const getRequest = objectStore.getAll();

//       getRequest.onsuccess = function(event) {
//         const data = event.target.result;
//         setContactsData(data);
//         setFilteredContacts(data)
//       };

//       getRequest.onerror = function(event) {
//         console.error("Error fetching data: " + event.target.errorCode);
//       };
//     };

//     return () => {
//       if (db) {
//         db.close();
//         console.log("Database closed");
//       }
//     };
//   }, []);

//     // Function to handle search input change
//     const handleSearchInputChange = (e) => {
//       const query = e.target.value.toLowerCase();
//       setSearchQuery(query);
  
//       // Open cursor on index and filter contacts
//       const filtered = [];
//       const transaction = db.transaction(["contacts"], "readonly");
//       const objectStore = transaction.objectStore("contacts");
//       const index = objectStore.index("firstName"); // Use the firstName index for searching
  
//       index.openCursor(IDBKeyRange.upperBound(query)).onsuccess = function(event) {
//         const cursor = event.target.result;
//         if (cursor) {
//           if (cursor.value.firstName.toLowerCase().includes(query) ||
//               cursor.value.lastName.toLowerCase().includes(query)) {
//             filtered.push(cursor.value);
//           }
//           cursor.continue();
//         } else {
//           if(query.length){
//           setFilteredContacts(filtered);
//           }else {
//             setFilteredContacts(contactsData)
//           }
//         }
//       };
//     };


//     if (!db) {
//       return <div>Loading...</div>;
//     }
    
//   return (
//     <div className="App">
//       <h1>IndexedDB Example</h1>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchQuery}
//         onChange={handleSearchInputChange}
//       />
//       <ul>
//         {filteredContacts.map(contact => (
//           <li key={contact.id} style={{padding: 20}}>
//             {contact.firstName} {contact.lastName} - {contact.phoneNo}
//           </li>
//         ))}
//       </ul>
//       {!filteredContacts.length && <p>No Data Found!</p>}
//     </div>
//   );
// }

// export default App;

// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";

// const App = () => {
// const [data, setData] = useState([])

//   const fetchInitialData = async () => {
//     const response = await fetch(
//       "https://onecontractoruat.pidilite.com/apis/v.1.0/basant-leads?mdicode__c=SDETEST&mh2code__c=SDETEST&divisioncode__c=70&search=&limit=300&offset=0",
//       {
//         headers: {
//           Authorization:
//             "Token eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NDMwOTAzLCJqdGkiOiI0MDUzZmQ1ZThkMzE0MmMwYWFjOGZmYTM2YzRiMGNlNSIsInBob25lIjoiODk4MDU3Nzc3NyIsInN1YiI6IkNNREktVG9rZW4iLCJjbWRpX2NvZGUiOiJFSVRFU1QyIiwibmFtZSI6IkNNREkiLCJjbWRpX3NmaWQiOiJhMDAydjAwMDA0WUdNRTBBQVAiLCJjbWRpX3JlY29yZHR5cGVuYW1lX2MiOiJFSSIsImlzcyI6IlBpZGlsaXRlLU9uZS1Db3JlIn0.LkPKlODWktlxJibAsO4BgfuYhZX7tupR5K0cgZwHgiU",
//         },
//       }
//     )
//     const data = await response.json();
//     setData(data.data.data)
//     console.log(data.data.data);
//   };

//   const createIndexDB = () => {
//     const request = indexedDB.open('myDataBase', 1);
//     request.onerror = (event) => {
//       console.error("Database error: " + event.target.errorCode);
//     }

//     request.onupgradeneeded = (event) => {
//       const db = event.target.result
//       const objectStore = db.createObjectStore('endUsers', {keyPath: 'id'})
//       objectStore.createIndex("firstname", "firstnname", { unique: false });
//       objectStore.createIndex("lastname", "lastname", { unique: false });

//       objectStore.transaction.onComplete = (event) => {
//         const endUserObjectStore = db
//         .transaction("endUsers", "readwrite")
//         .objectStore("endUsers");
//         data.forEach((item) => {
//         endUserObjectStore.add(item);
//         });
//       }
//     }

//     request.onsuccess = (event) => {
//       const db = event.target.result;
//       console.log("Database opened successfully", db);
//     }
//   }

//   useEffect(() => {
//     fetchInitialData()
//     data && createIndexDB ()
//   }, [])

//   return(
//     <div>
//       <ul>
//         {data.map(item => (
//           <li key={item.id} style={{padding: 20}}>
//             {item.firstname} {item.lastname} - {item.phone}
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default App
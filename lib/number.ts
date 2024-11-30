// export const  handleBigInt = (data: unknown):unknown =>  {
//     if (typeof data === 'bigint') {
//       return data.toString();
//     }
  
//     if (Array.isArray(data)) {
//       return data.map(handleBigInt);
//     }
  
//     if (data && typeof data === 'object') {
//       const newData: { [key: string]: unknown } = {};
//       for (const key in data) {
//         if (data.hasOwnProperty(key)) {
//           newData[key] = handleBigInt(data[key]);
//         }
//       }
//       return newData;
//     }
  
//     return data;
//   }
module.exports =async function (request, showSpinner, hideSpinner) {
    const timeout = {};
    const result = request();
    const race = await Promise.race([result, delay(250, timeout)]);
    if (race == timeout) {
      showSpinner();
      await delay(1000);
      hideSpinner();
    }
  
    return result;
  }
  
  function delay(ms, result) {
    return new Promise(r => setTimeout(() => r(result), ms));
  }
  
  function show() {
    console.log('show');
  }
  
  function hide() {
    console.log('hide');
  }
  
  function req() {
    return delay(100, 'result'); // эмулируем запрос длящийся меньше порога
  }
  
  function req2() {
    return delay(300, 'result 2'); // эмулируем запрос длящийся дольше порога
  }
  
  (async() => {
    console.log(await doRequest(req, show, hide));
    console.log(await doRequest(req2, show, hide));
  })()
  
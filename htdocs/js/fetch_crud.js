const postIkku = document.querySelector('.postIkku');
const postBtn = document.querySelector('.postBtn');
const ikkulist = document.querySelector('.ikkuList');
const url = 'http://localhost:3000/ikku';

/* ###################################################################### */

// Create

document.addEventListener('DOMContentLoaded', () => {
  postBtn.addEventListener('click', createFetch, false);
});

function createFetch() {
  const data = {
    ikku: postIkku.value
  };
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (!response.ok) {
      console.log('Create error!');
      throw new Error('error');
    }
    console.log('Create ok!');
    return response.json();
  }).then((data) => {
    appendList(data);
  }).catch((error) => {
    console.log(error);
  });
}

/* ###################################################################### */

// Read

document.addEventListener('DOMContentLoaded', () => {
  readFetch();
});

function readFetch() {
  fetch(url).then((response) => {
    if (!response.ok) {
      console.log('Read error!');
      throw new Error('error');
    }
    console.log('Read ok!');
    return response.json();
  }).then((data) => {
    for (let i = 0; i < data.length; i++) {
      const thisData = data[i];
      appendList(thisData);
    }
  }).catch((error) => {
    console.log(error);
  });
}

/* ###################################################################### */

// Update

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.className !== 'updateBtn') {
      return;
    }
    const thisLi = e.target.closest('li');
    updateFetch(thisLi);
  }, false);
});

function updateFetch(thisLi) {
  const thisId = thisLi.dataset.id;
  const updateUrl = url + '/' + thisId;
  const updateArea = thisLi.querySelector('.updateArea');
  const updateIkku = thisLi.querySelector('.updateIkku').value;
  const data = {
    ikku: updateIkku
  };

  fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => {
    if (!response.ok) {
      console.log('Update error!');
      throw new Error('error');
    }
    console.log('Update ok!');
    return response.json();
  }).then((data) => {
    thisLi.querySelector('.ikkuList__ikkuValue').textContent = data.ikku;
    thisLi.removeChild(updateArea);
  }).catch((error) => {
    console.log(error);
  });
}

/* ###################################################################### */

// Delete
document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.className !== 'doDelete') {
      return;
    }
    const thisLi = e.target.closest('li');
    deleteFetch(thisLi);
  }, false);
});

function deleteFetch(thisLi) {
  const thisId = thisLi.dataset.id;
  const updateUrl = url + '/' + thisId;

  fetch(updateUrl, {
    method: 'DELETE',
  }).then((response) => {
    if (!response.ok) {
      console.log('Delete error!');
      throw new Error('error');
    }
    console.log('Delete ok!');
  }).then(() => {
    thisLi.remove()
  }).catch((error) => {
    console.log(error);
  });
}

/* ###################################################################### */

// Append Button
const appendBtn = (className, text) => {
  const btn = document.createElement('button');
  btn.className = className;
  btn.innerHTML = text;
  return btn;
};

// Append List
const appendList = (thisData) => {
  const li = document.createElement('li');
  li.dataset.id = thisData.id;

  const span = document.createElement('span');
  span.className = 'ikkuList__ikkuValue'
  span.innerHTML = thisData.ikku;
  li.append(span);

  const updateBtn = appendBtn('doUpdate', '修正');
  li.prepend(updateBtn);
  const deleteBtn = appendBtn('doDelete', '削除');
  li.prepend(deleteBtn);

  ikkulist.appendChild(li);
};

// Append Update Area
const appendUpdateInput = (thisIkku) => {
  const input = document.createElement('input');
  input.type = 'text';
  input.name = 'updateIkku';
  input.size = '30';
  input.maxlength = '30px';
  input.className = 'updateIkku';
  input.value = thisIkku;
  return input;
};

const appendUpdateBtn = () => {
  const btn = document.createElement('input');
  btn.type = 'button';
  btn.value = '送信';
  btn.className = 'updateBtn';
  return btn;
};

const appendUpdateArea = (thisLi) => {
  const thisIkku = thisLi.querySelector('.ikkuList__ikkuValue').textContent;
  const appendDiv = document.createElement('div');
  appendDiv.className = 'updateArea';
  appendDiv.appendChild(appendUpdateInput(thisIkku));
  appendDiv.appendChild(appendUpdateBtn());
  thisLi.appendChild(appendDiv);
};

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.className !== 'doUpdate') {
      return;
    }
    const thisLi = e.target.closest('li');
    if (thisLi.querySelector('.updateArea') === null) {
      appendUpdateArea(thisLi);
    }
  }, false);
});

/* ###################################################################### */

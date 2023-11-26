// export function createdHijack(
// 	componentOptions: ComponentOptions,
// 	before: Func[] = [],
// 	after: Func[] = [],
//   ) {
// 	const lifetimes = componentOptions.lifetimes ||= {};
// 	// const originalOptions = deepClone(options);
// 	const originalCreatedFn = lifetimes.created;

// 	lifetimes.created = function() {
// 	  before.forEach((func) => {
// 		func.call(this, componentOptions);
// 	  });

// 	  originalCreatedFn && originalCreatedFn.call(this);

// 	  after.forEach((func) => {
// 		func.call(this, componentOptions);
// 	  });
// 	};
//   }

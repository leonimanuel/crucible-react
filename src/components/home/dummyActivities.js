 var d = new Date();
 let time = d.setTime(d.getTime()-50000);

export const dummyActivities = [
  {
    actor: {
      id: 1,
      name: 'Leon Malisov',
      handle: 'leon_malisov'
    },
    item: {
      type: 'Comment',
      object: {
        id: 17,
        content: "that's the idea...",
        fact_order: [],
        response_excerpt: {
          id: 57,
          content: 'The share of foreign-born people in the United States is back to the levels of the first two decades of the 20th century.',
          node_text: 'If immigrants are so upwardly mobile, why doesn’t it seem that way? One reason is that there are more newcomers than there have been in decades and most haven’t had time yet to get ahead. The share of foreign-born people in the United States is back to the levels of the first two decades of the 20th century.'
        },
        article_title: 'Opinion | Why So Many Children of Immigrants Rise to the Top - The New York Times',
        article_url: 'https://www.nytimes.com/interactive/2022/07/11/opinion/immigrants-success-america.html?',
        span_id: null,
        startPoint: null,
        endPoint: null,
        previous_el_id: null,
        discussion_id: null,
        user_id: 1,
        selection_comment_upvotes: 0,
        selection_comment_downvotes: 0,
        review_status: 'pending',
        group_id: null,
        group_name: null,
        user: {
          id: 1,
          name: {
            id: 1,
            name: 'Leon Malisov',
            email: 'leonmalisov@gmail.com',
            password_digest: '$2a$12$nLAT1kVTzUCgZWdBb5.KeOPNWikTqb4oCE2JHeUa7mTlknQrh.T3y',
            created_at: '2022-04-24T18:03:49.555Z',
            updated_at: '2022-04-24T18:04:04.172Z',
            daily_reviews: 0,
            daily_streaks: 0,
            handle: 'leon_malisov',
            total_upvotes: 0,
            total_downvotes: 0,
            feed_email: true,
            email_confirmed: true,
            confirm_token: null,
            daily_facts_comments: 0,
            reach_score: 0,
            reset_password_token: null
          },
          daily_facts_comments: 0
        },
        facts: [],
        facts_comments_reviews: [],
        replies: [],
        tagged_users: [],
        subject_id: 1
      },
      tagged_users: null,
      reviewable: false,
      review_type: 'Comment',
      review_object: null
    },
    time: '2022-07-13T23:19:57.571000',
    activity_id: '4f6ced30-0302-11ed-8080-80001d3e704f'
  },
  {
    actor: {
      id: 1,
      name: 'Billy Buxingtonerooni',
      handle: 'billybux'
    },
    item: {
      type: 'Comment',
      object: {
        id: 110,
        content: 'For real though crazy stuff',
        fact_order: [
          11,
          10
        ],
        response_excerpt: {
          id: 74,
          content: 'Repeatedly since 2016, L.A.’s efforts to create safer road configurations have run up against parochial resistance and been abandoned',
          node_text: 'Repeatedly since 2016, L.A.’s efforts to create safer road configurations have run up against parochial resistance and been abandoned, says Schneider. Perhaps the most notorious example was the case of Vista Del Mar, a high-speed thoroughfare that runs right along the beach. In 2017, Los Angeles settled with the family of a 16-year-old girl who was killed crossing the road from her parked car for $9.5 million. At the time, the paper noted, there was not a crosswalk for almost two miles.'
        },
        article_title: 'The Best Way to Beat a Bike-Lane Backlash - Bloomberg',
        article_url: 'https://www.bloomberg.com/news/articles/2022-04-04/the-best-way-to-beat-a-bike-lane-backlash',
        span_id: null,
        startPoint: null,
        endPoint: null,
        previous_el_id: null,
        discussion_id: null,
        user_id: 1,
        selection_comment_upvotes: 0,
        selection_comment_downvotes: 0,
        review_status: 'pending',
        group_id: null,
        user: {
          id: 1,
          name: {
            id: 1,
            name: 'Billy Buxingtonerooni',
            email: 'billy@aol.com',
            password_digest: '$2a$12$dVE42Pz30.x.wNGD4cf9u.fZ7b7Vjl4lkx3Zrm2jDadoWBnrKCTKW',
            created_at: '2020-09-03T14:32:10.577Z',
            updated_at: '2022-05-31T17:07:25.628Z',
            daily_reviews: 10,
            daily_streaks: 1,
            handle: 'billybux',
            total_upvotes: 4,
            total_downvotes: 3,
            feed_email: true,
            email_confirmed: true,
            confirm_token: 'owGRBpW4CyPStp7YEdhyDw',
            daily_facts_comments: 79,
            reach_score: 2300,
            reset_password_token: ''
          },
          daily_facts_comments: 79
        },
        facts: [
          {
            collector_id: 1,
            id: 11,
            content: 'the Eastern half of the country has gotten more rain, on average, over the last 30 years than it did during the 20th century, while precipitation has decreased in the West',
            node_text: null,
            url: 'https://www.nytimes.com/interactive/2021/08/24/climate/warmer-wetter-world.html',
            review_status: 'pending',
            comment_id: 110,
            created_at: '2022-04-12T17:38:08.259Z'
          },
          {
            collector_id: 1,
            id: 10,
            content: 'Even if they are awarded a grant, communities are required to pay a share of the project — often 25 percent, which is unaffordable for many struggling towns and counties.',
            node_text: null,
            url: 'https://www.nytimes.com/2021/12/03/climate/climate-change-infrastructure-bill.html',
            review_status: 'pending',
            comment_id: 110,
            created_at: '2022-04-12T17:38:08.259Z'
          }
        ],
        facts_comments_reviews: [
          {
            comment_fact_upvotes: 0,
            comment_fact_downvotes: 0,
            review_status: 'pending'
          },
          {
            comment_fact_upvotes: 0,
            comment_fact_downvotes: 0,
            review_status: 'pending'
          }
        ],
        replies: [],
        tagged_users: [
          {
            id: 29,
            handle: 'leon_cov'
          }
        ],
        subject_id: 1
      },
      tagged_users: null,
      reviewable: true,
      review_type: 'Comment',
      review_object: {
        id: 131,
        comment_content: 'For real though crazy stuff',
        fact_content: 'the Eastern half of the country has gotten more rain, on average, over the last 30 years than it did during the 20th century, while precipitation has decreased in the West',
        comment_fact_upvotes: 0,
        comment_fact_downvotes: 0,
        subject_id: 1
      }
    },
    time: time,
    activity_id: '50eb4530-ba87-11ec-8080-8001611e5fb1'
  },
]